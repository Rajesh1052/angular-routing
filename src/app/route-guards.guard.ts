import { inject } from '@angular/core';
import {
  CanDeactivateFn,
  CanMatchFn,
  RedirectCommand,
  Router,
} from '@angular/router';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

export const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (component.submitted) {
    return true;
  }
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    return window.confirm(
      'Do You really want to leave? You may loose entered data'
    );
  }
  return true;
};
