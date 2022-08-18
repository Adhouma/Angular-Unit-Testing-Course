import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Hero } from "../hero";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('HeroesComponent Deep test', () => {

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
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each Hero as a Hero component', () => {
        // Given
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));

        // When
        fixture.detectChanges();

        // Then
        const heroComponentList = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponentList.length).toEqual(3);
        expect(heroComponentList[0].componentInstance.hero.name).toEqual('SpiderMan');
        expect(heroComponentList[1].componentInstance.hero.strength).toEqual(808);
        expect(heroComponentList[2].componentInstance.hero.id).toEqual(3);
    })
});