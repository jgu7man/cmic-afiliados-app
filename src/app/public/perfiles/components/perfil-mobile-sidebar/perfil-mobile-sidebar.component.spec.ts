import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMobileSidebarComponent } from './perfil-mobile-sidebar.component';

describe('PerfilMobileSidebarComponent', () => {
  let component: PerfilMobileSidebarComponent;
  let fixture: ComponentFixture<PerfilMobileSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMobileSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilMobileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
