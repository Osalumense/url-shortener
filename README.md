# URL-Shortener

## Description
An API service to shorten URLs


## Shorten a URL

### Request

`POST /shorten`

```json
{
    "url": "https://google.com",
    "slug": "ultjsllo" // This is optional and can be left empty to allow the API generate a unique slug
}
```

### Response

```json
{
    "status": "success",
    "code": 201,
    "message": "URL shortened successfully",
    "data": {
        "id": 1,
        "short_id": "ultjsllo",
        "original_url": "https://google.com",
        "created_at": "2024-03-10T04:29:15.000Z",
        "updated_at": "2024-03-10T04:29:15.000Z"
    }
}
```

## Get a URL

### Request

`GET /ultjsllo`

### Response

```json
{
    "status": "success",
    "code": 200,
    "message": "Url gotten successfully",
    "message": {
        "id": 1,
        "short_id": "ultjsllo",
        "original_url": "https://google.com",
        "created_at": "2024-03-10T07:49:13.000Z",
        "updated_at": "2024-03-10T07:49:13.000Z"
    }
}

```






##### Postman Documentation Link
_[Postman Documentation](https://documenter.getpostman.com/view/17952060/2sA2xh3DW6)_


##### Running the project in your local machine
    - clone the repo
    - Run `yarn install` to install all dependencies
    - Rename .env.example file to .env or you can choose to copy it using `cp .env.example .env` if you want to keep the .env.example file for reference
    - Fill in the environment variables
    - Run pending migrations using `npx knex migrate:latest`
    - Run `yarn start` to run the application
    - Run `yarn test-dev` to run test cases
