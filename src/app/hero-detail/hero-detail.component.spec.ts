import { Location } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { of } from "rxjs";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe('HeroDetailComponent', () => {

    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockHeroSerice: jasmine.SpyObj<HeroService>;
    let mockLocation: jasmine.SpyObj<Location>;
    let mockActivatedRoute: jasmine.SpyObj<any>;

    beforeEach(() => {
        mockHeroSerice = jasmine.createSpyObj('MockHeroService', ['getHero', 'updateHero']); // Mock HeroService methods
        mockLocation = jasmine.createSpyObj('MockLocation', ['back']); // Mock Location methods
        mockActivatedRoute = { // Mock ActivatedRoute properties & methods
            snapshot: { // ActivatedRoute contain snapshot property
                paramMap: { // snapshot property contain paramMap property
                    get: () => { // paramMap property contain get method
                        return '3'
                    }
                }
            }
        }

        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            imports: [FormsModule], // Because we use ngModel in our template
            providers: [
                { provide: HeroService, useValue: mockHeroSerice },
                { provide: Location, useValue: mockLocation },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
    });

    it('should work', () => {
        // Given
        const hero: Hero = { id: 4, name: 'Wolverine', strength: 80 };

        mockHeroSerice.getHero.and.returnValue(of(hero));

        // When
        fixture.detectChanges();

        // Then
        expect((<HTMLElement>fixture.nativeElement).querySelector('h2').textContent).toContain(hero.name.toUpperCase());
    });
});