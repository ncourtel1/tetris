export default class ECS {
   constructor(){
      this.entities = [];
      this.systems = [];
      this.entitiesToAdd = [];
      this.entitiesToRemove = new Set(); // Utilisation d'un Set pour éviter les doublons
   }

   addEntity(entity){
      this.entitiesToAdd.push(entity);
   }

   addSystem(system){
      this.systems.push(system);
   }

   removeEntity(entity) {
      this.entitiesToRemove.add(entity);
   }
   
   removeSystem(system) {
      const index = this.systems.indexOf(system);
      if (index > -1) {
         this.systems.splice(index, 1);
      }
   }

   update(dt){
      this.entities.push(...this.entitiesToAdd);
      this.entitiesToAdd = [];

      for(const system of this.systems){
         system.update(this.entities, dt);
      }

      // Supprime les entités marquées pour suppression
      this.entities = this.entities.filter(entity => !this.entitiesToRemove.has(entity));
      this.entitiesToRemove.clear();
   }
}