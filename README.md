# GraphQL Wrapper for FiveM
This resource aims to facilitate the usage of GraphQL on your fivem server.
It should work with Lua/C#/JS environnements. 

## Installation
You need webpack and yarn resources to get this script working and MongoDB.

- Download the latest release
- Extract the resource in your resources/ folder
- Go to the resource folder and start editing `db.ts` to enter your database information.

## Configuration

You need to create models, schemas, queries, mutations etc.. You can find a simple example in `src/config/vehicles.ts`.

https://graphql.org/learn/queries/

## Examples

This wrapper is relatively simple, here at the main functions.

```js
function registerGraphSchema(name: string, config: GraphQLSchemaConfig);
```
It regiters a "graph schema" and this schema can be later retrived with its name.

/!\ You cannot use this function outside of the JS environnement.

```js
query(schema: string, params: string | Source, callback?: Function);
```

This is what you can use to execute queries/mutations with GraphQL.
Example
```js
const s = `mutation {
    addVehicle(name: "Blista", plate: "ABCDEFGH", model: "blista") {
        name,
        model
    }
}`

query('Vehicle', s, (result) => console.log(result))
```

