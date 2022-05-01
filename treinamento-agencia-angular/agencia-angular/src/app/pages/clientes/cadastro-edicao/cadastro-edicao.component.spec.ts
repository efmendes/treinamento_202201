import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEdicaoComponent } from './cadastro-edicao.component';

describe('CadastroEdicaoComponent', () => {
  let component: CadastroEdicaoComponent;
  let fixture: ComponentFixture<CadastroEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEdicaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
