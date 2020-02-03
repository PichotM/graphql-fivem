import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from "graphql"
import { Schema } from 'mongoose'
import { registerGraphSchema } from '../main'
import { model } from 'mongoose'

// Model)
const Vehicle = model("Vehicle", new Schema({
    name: String,
    model: String,
    plate: String
}))

const vehicleType = new GraphQLObjectType({
    name: "Vehicle",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        plate: { type: GraphQLString },
    })
})

const vehicleQuery = new GraphQLObjectType({
    name: 'VehicleQuery',
    fields: {
        vehicle: {
            type: vehicleType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args){
                return Vehicle.findById(args.id)
            }
        }
    }
});

const vehicleMutation = new GraphQLObjectType({
    name : 'VehicleMutation',
    fields: {
        addVehicle: {
            type: vehicleType,
            args: {
                name: { type: GraphQLString },
                model: { type: GraphQLString },
                plate: { type: GraphQLString },
            },
            resolve(parent, args) {
                const vehicle = new Vehicle({
                    name: args.name,
                    model: args.model,
                    plate: args.plate
                })

                return vehicle.save()
            }
        }
    }
})

export function loadVehicleConfig() {
    registerGraphSchema("Vehicle", {
        query: vehicleQuery,
        mutation: vehicleMutation
    })
}