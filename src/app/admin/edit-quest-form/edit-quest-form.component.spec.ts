import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestFormComponent } from './edit-quest-form.component';

describe('EditQuestFormComponent', () => {
  let component: EditQuestFormComponent;
  let fixture: ComponentFixture<EditQuestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditQuestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQuestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
