import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { FontSizeDirective } from './font-size.directive';

@NgModule({
  declarations: [FullNamePipe, FontSizeDirective],
  imports: [CommonModule],
  exports: [FullNamePipe, FontSizeDirective],
})
export class SharedModule {}
