const CR_LOCATIONS = {
  "San José": { cantones: { "San José":1,"Escazú":1,"Desamparados":1,"Puriscal":1,"Tarrazú":1,"Aserrí":1,"Mora":1,"Goicoechea":1,"Santa Ana":1,"Alajuelita":1,"Vásquez de Coronado":1,"Acosta":1,"Tibás":1,"Moravia":1,"Montes de Oca":1,"Turrubares":1,"Dota":1,"Curridabat":1,"Pérez Zeledón":1,"León Cortés Castro":1 } },
  "Alajuela": { cantones: { "Alajuela":1,"San Ramón":1,"Grecia":1,"San Mateo":1,"Atenas":1,"Naranjo":1,"Palmares":1,"Poás":1,"Orotina":1,"San Carlos":1,"Zarcero":1,"Sarchí":1,"Upala":1,"Los Chiles":1,"Guatuso":1,"Río Cuarto":1 } },
  "Cartago": { cantones: { "Cartago":1,"Paraíso":1,"La Unión":1,"Jiménez":1,"Turrialba":1,"Alvarado":1,"Oreamuno":1,"El Guarco":1 } },
  "Heredia": { cantones: { "Heredia":1,"Barva":1,"Santo Domingo":1,"Santa Bárbara":1,"San Rafael":1,"San Isidro":1,"Belén":1,"Flores":1,"San Pablo":1,"Sarapiquí":1 } },
  "Guanacaste": { cantones: { "Liberia":1,"Nicoya":1,"Santa Cruz":1,"Bagaces":1,"Carrillo":1,"Cañas":1,"Abangares":1,"Tilarán":1,"Nandayure":1,"La Cruz":1,"Hojancha":1 } },
  "Puntarenas": { cantones: { "Puntarenas":1,"Esparza":1,"Buenos Aires":1,"Montes de Oro":1,"Osa":1,"Quepos":1,"Golfito":1,"Coto Brus":1,"Parrita":1,"Corredores":1,"Garabito":1 } },
  "Limón": { cantones: { "Limón":1,"Pococí":1,"Siquirres":1,"Talamanca":1,"Matina":1,"Guácimo":1 } },
};

export function getProvincias() {
  return Object.keys(CR_LOCATIONS);
}

export function getcantones(provincia) {
  return provincia && CR_LOCATIONS[provincia] ? Object.keys(CR_LOCATIONS[provincia].cantones) : [];
}

export default CR_LOCATIONS;
