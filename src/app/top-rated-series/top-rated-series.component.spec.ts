import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedSeriesComponent } from './top-rated-series.component';

describe('TopRatedSeriesComponent', () => {
  let component: TopRatedSeriesComponent;
  let fixture: ComponentFixture<TopRatedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
