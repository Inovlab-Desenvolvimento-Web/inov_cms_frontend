import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject, OnDestroy } from '@angular/core';
import { AuthService } from 'core';

@Directive({ selector: '[hasRole]', standalone: true })
export class HasRoleDirective implements OnDestroy {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly auth = inject(AuthService);
  private roles: string[] = [];
  private readonly effectRef = effect(() => {
    this.updateView();
  });

  @Input('hasRole')
  set roles(value: string[]) {
    this.roles = value ?? [];
    this.updateView();
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

  private updateView() {
    const user = this.auth.user();
    if (user && this.roles.includes(user.role)) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }
}
