import { Component, ContentChildren, QueryList } from "@angular/core";
import { PaneDirective } from "./pane.directive";
@Component({
  selector: "tab",
  template: `
    <div>panes: {{serializedPanes}}</div>
  `
})
export class TabComponent {
  @ContentChildren(PaneDirective) private panes: QueryList<PaneDirective>;
  get serializedPanes(): string { return this.panes ? this.panes.map(p => p.id).join(", ") : ""; }
}
