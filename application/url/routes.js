const router = require('express').Router();
const { pick, isNil } = require('ramda');
const url = require('./');
const visit = require('../visit');
const throwError = require('../../helpers/throw-error');
const { validateUrlBody } = require('./validations');

router.get('/:hash', async (req, res, next) => {
  try {
    const publicFields = ['url', 'isCustom', 'hash'];
    const agent = req.get('user-agent');
    const accepts = req.get('Accept');

    const source = await url.getUrl(req.params.hash);
    if (isNil(source)) return throwError('short url not found', 404, 'URLNotFound', 404);

    await visit.registerVisit({ agent }, source._id);
    const totalVisits = await visit.getVisitCounts(source._id);
    const publicUrl = Object.assign({}, pick(publicFields, source), { totalVisits });
    // Behave based on the requested format using the 'Accept' header.
    // If header is not provided or is */* redirect instead.

    switch (accepts) {
      case 'text/plain':
        res.end(source.url);
        break;
      case 'application/json':
        res.json(publicUrl);
        break;
      default:
        res.redirect(source.url);
        break;
    }
  } catch(error) {
    next(error);
  }

});


router.post('/', async (req, res, next) => {
  try {
    const validatedBody = validateUrlBody(req.body);
    let shortUrl = await url.shorten(validatedBody.url);
    res.json(shortUrl);
  } catch (error) {
    next(error);
  }
});


router.delete('/:hash/:removeToken', async (req, res, next) => {
  // TODO: Remove shortened URL if the remove token and the hash match
  let notImplemented = new Error('Not Implemented');
  notImplemented.status = 501;
  next(notImplemented);
});

module.exports = router;
