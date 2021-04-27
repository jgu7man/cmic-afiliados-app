import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoSidebarComponent } from './afiliado-sidebar.component';

describe('AfiliadoSidebarComponent', () => {
  let component: AfiliadoSidebarComponent;
  let fixture: ComponentFixture<AfiliadoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadoSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
