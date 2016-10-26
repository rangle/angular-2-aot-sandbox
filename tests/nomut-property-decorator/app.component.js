"use strict";
var core_1 = require("@angular/core");
function ReadOnly(target, key) {
    Object.defineProperty(target, key, { writable: false });
}
var World = (function () {
    function World() {
    }
    __decorate([
        ReadOnly, 
        __metadata('design:type', String)
    ], World.prototype, "name", void 0);
    return World;
}());
var world = new World();
var AppComponent = (function () {
    function AppComponent() {
        this.greeting = world;
        console.log(this.greeting);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            template: "Hello {{greeting.name}}"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUUxQyxrQkFBa0IsTUFBVyxFQUFFLEdBQVc7SUFDeEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVEO0lBQUE7SUFHQSxDQUFDO0lBRkM7UUFBQyxRQUFROzt1Q0FBQTtJQUVYLFlBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVELElBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFNMUI7SUFFRTtRQURBLGFBQVEsR0FBVSxLQUFLLENBQUM7UUFFdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQVJIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLHlCQUF5QjtTQUNwQyxDQUFDOztvQkFBQTtJQU1GLG1CQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSxvQkFBWSxlQUt4QixDQUFBO0FBQUEsQ0FBQyJ9