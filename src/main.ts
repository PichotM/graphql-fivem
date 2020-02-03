import { graphql, GraphQLSchema, Source, GraphQLSchemaConfig } from 'graphql'
import { connect, connection, Schema, model } from 'mongoose'
import { loadVehicleConfig } from './config'
import { mongodbUrl, mongodbDatabase, triggerGlobalEvent } from './db';

connect(`${mongodbUrl}/${mongodbDatabase}`, { useNewUrlParser: true });

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
    if (triggerGlobalEvent)
        emit('onDatabaseReady')

    loadVehicleConfig()
});

// Exports
// The purpose of theses are only to facilitate the usage of GraphQL
const schemas: any = {}

/**
 * Register a schema in graphQL
 * @param name 
 * @param config 
 */
export function registerGraphSchema(name: string, config: GraphQLSchemaConfig) {
    schemas[name] = new GraphQLSchema(config);
}

/**
 * GraphQL query function helper
 * @param schema 
 * @param params 
 * @param callback 
 */
export function query(schema: string, params: string | Source, callback?: Function) {
    if (!schema) return console.error("[GraphQL] schema is missing in your query.");
    if (!schemas[schema]) return console.error(`[GraphQL] ${schema} is not registered.`)
    if (!params) return console.error("[GraphQL] params is missing in your query.");

    const scheme = schemas[schema]
    graphql(scheme, params).then((result) => {
        if (callback)
            callback(result)
    })
}

// exports
exports("query", query)
exports("registerGraphSchema", registerGraphSchema)