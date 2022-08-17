import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent with dependency Test', () => {

    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService: jasmine.SpyObj<HeroService>;
    let mockHeroes: Hero[];

    beforeEach(() => {
        mockHeroes = [
            { id: 1, name: 'SpiderMan', strength: 50 },
            { id: 2, name: 'SuperMan', strength: 808 },
            { id: 3, name: 'BatMan', strength: 30 },
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        // Configure a Testing module for our HerosComponent 
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            imports: [
                // We need RouterTestingModule because our template use routerLink
                RouterTestingModule
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes array when getHeroes() is called', () => {
        // Given
        // call the subscribe function (return mockHeroes with of(mockHeroes))
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

        // When
        fixture.detectChanges();

        // Then
        // Use fixture.componentInstance to interact with the component (.ts)
        expect(fixture.componentInstance.heroes.length).toEqual(3);
    });
});