import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualServersComponent } from './virtual-servers.component';

describe('VirtualServersComponent', () => {
  let component: VirtualServersComponent;
  let fixture: ComponentFixture<VirtualServersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualServersComponent]
    });
    fixture = TestBed.createComponent(VirtualServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
