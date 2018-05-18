# URL Shortener Challenge

## Challenge Description

This challenge consists in completing the missing features of a service to shorten URLS. The main feature to develop is to replace the UUID placeholrder for an algorithm to shorten the urls.

## Solution

### URL shorten algorithm

The chosen algorithm is based on a cypher (using a bijective conversion function). This was the recommended aproach in several articles I read. The algorithm uses an autoincrement integer field as the number to encode into the url hash, this was used instead of generating a random number or using the timestamp to avoid collisions and to reduce the length of the hash.

### Additional Features

  - Completed feature to remove (soft delete) a registered URL.
  - Added the feature for optionally adding a custom hash for the shortened id instead of using the incremental field.
  - Adds a simple logging system that saves the errors.
  - Implements an simple error handler.

### Structure change

As part of the solution I also changed the structure of the service to attempt for a cleaner structure and code following the principles of Uncle Bob's (Robert C. Martin) clean architecture that is based on layers and tries to decouple  modules from the main application, in this case  the database and the shortener algorithm. The folder structure changed as follows:

* application: this contains the main application modules, each subfolder is separated by features.
  - url
  - cypher
  - visit

* configs: contains de config files, it takes most of the config from the environment variables.
* helpers: contains several utilitiy modules
* store: contains the modules that handle data persistance, in this case mongodb
 
## References (that i remember)
[Geeks for geeks](https://www.geeksforgeeks.org/how-to-design-a-tiny-url-or-url-shortener/)

[Code horror](https://blog.codinghorror.com/url-shortening-hashes-in-practice/)

[PHP URL Shortener Algorithm How-to](https://medium.com/@frjalex/php-url-shortener-algorithm-how-to-a6219a69e97f)

