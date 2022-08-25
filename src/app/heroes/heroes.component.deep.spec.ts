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

    it("should call heroService.deleteHero when the Hero's component delete button is clicked", () => {
        // Given
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
        spyOn(fixture.componentInstance, 'delete'); // Find the delete method on the Heros component and watch if it invoked

        // When
        fixture.detectChanges();

        const heroComponentList = fixture.debugElement.queryAll(By.directive(HeroComponent)); // Select all Hero <app-hero>

        // Trigger the delete event (delete) on the Hero <app-hero (delete)="delete(hero)"> component (Recommended)
        (<HeroComponent>heroComponentList[0].componentInstance).delete.emit();

        // Alternative 1 
        // heroComponentList[0].triggerEventHandler('delete', null); // Trigger the delete event no matter if exist or not

        // Alternative 2 (least preferable)
        // heroComponentList[0].query(By.css('button'))
        //     .triggerEventHandler('click', {stopPropagation: () => {}}) // Trigger the delete event by click on the Hero delete button manually

        // Then
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(mockHeroes[0]);
    });

    it('should add new Hero to the heroes list when the add button is clicked', () => {
        // Given
        mockHeroService.getHeroes.and.returnValue(of(mockHeroes));
        fixture.detectChanges();

        const newHeroName = 'Wolverine';
        const inputTextElement = fixture.debugElement.query(By.css('input')).nativeElement; // Get the inputText elemet
        const addButton = fixture.debugElement.query(By.css('button')); // Get the button element

        mockHeroService.addHero.and.returnValue(of({ id: 4, name: newHeroName, strength: 50 }));

        // When
        (<HTMLInputElement>inputTextElement).value = newHeroName; // inputText value = heroName
        addButton.triggerEventHandler('click', null); // Click the add button

        fixture.detectChanges();

        // Then
        const heroComponentList = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect((<Hero>heroComponentList[3].componentInstance.hero).id).toEqual(4);
        expect((<Hero>heroComponentList[3].componentInstance.hero).name).toEqual(newHeroName);
        expect((<Hero>heroComponentList[3].componentInstance.hero).strength).toEqual(50);
    });
});