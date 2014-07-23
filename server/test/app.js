//dichiaro di essere in modalità test
process.env.NODE_ENV = 'test';

//avere accesso all'applicazione (deve essere importata)
//aggiungo un module exports alla mia applicazione
//la richiedo tramite require con path relativo
var app = require('./../app');
var expect = require('chai').expect;
 
//mocha lavora per blocchi semantici
//descriviamo aspetti della nostra applicazione  anche nidificati
//dentro ogni descrizione posso testare la porzione di interessa
describe('remoreStorage', function(){
	
	it('exist', function(){
		expect(app).to.exist;
	});
});