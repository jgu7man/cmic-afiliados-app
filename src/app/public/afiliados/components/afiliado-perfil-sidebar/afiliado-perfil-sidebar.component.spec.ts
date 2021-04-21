import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoPerfilSidebarComponent } from './afiliado-perfil-sidebar.component';

describe('AfiliadoPerfilSidebarComponent', () => {
  let component: AfiliadoPerfilSidebarComponent;
  let fixture: ComponentFixture<AfiliadoPerfilSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadoPerfilSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliadoPerfilSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
