"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
const eventServices = __importStar(require("../services/eventServices"));
function getEvents(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get events");
            const events = yield eventServices.getEntries.getAll();
            console.log("event", events);
            return res.json(events);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get events' });
        }
    });
}
function getEventById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get event");
            const id = req.params.id; //parametre de ruta 
            const event = yield eventServices.getEntries.findById(id);
            console.log("event", event);
            return res.json(event);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get events' });
        }
    });
}
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, date, ubication, creator } = req.body;
            // Creamos un nuevo objeto deevent
            const newEvent = {
                name,
                description,
                date: date ? new Date(date) : new Date(),
                ubication,
                creator
            };
            // Usamos el servicio para crear el event
            const event = yield eventServices.getEntries.create(newEvent);
            return res.json({
                message: "Event created",
                event
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create event' }); // Devuelve un mensaje de error al frontend
        }
    });
}
function updateEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get event');
            const id = req.params.id;
            const { name, description, date, ubication, creator } = req.body;
            const updatedEvent = { name, description, date, ubication, creator };
            const event = yield eventServices.getEntries.update(id, updatedEvent);
            if (!event) {
                return res.status(404).json({ error: 'Event with id ${id} not found' });
            }
            return res.json({
                message: "Event updated",
                event
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update event' });
        }
    });
}
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete event');
            const id = req.params.id;
            const event = yield eventServices.getEntries.delete(id);
            if (!event) {
                return res.status(404).json({ error: 'Event with id ${id} not found' });
            }
            return res.json(event);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get event' });
        }
    });
}
