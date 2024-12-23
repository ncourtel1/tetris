export default class InputSystem {
   constructor() {
     this.keys = {};
 
     window.addEventListener("keydown", (e) => {
       this.keys[e.key] = true;
     });
 
     window.addEventListener("keyup", (e) => {
       this.keys[e.key] = false;
     });
   }
 
   update(entities) {
     entities.forEach(entity => {
       const input = entity.getComponent('input');
       if (input) {
         input.x = this.keys['ArrowRight'] ? 1 : this.keys['ArrowLeft'] ? -1 : 0;
         input.y = this.keys['ArrowDown'] ? 1 : 0;
         input.rotatePressed = this.keys['a'] || false;
       }
     });
   }
}