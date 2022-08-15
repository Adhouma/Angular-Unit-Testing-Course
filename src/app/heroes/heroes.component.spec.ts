import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent Test', () => {

    let herosComponent: HeroesComponent;
    let mockHeroService: jasmine.SpyObj<HeroService>;
    let mockHeroes: Hero[];

    beforeEach(() => {
        mockHeroes = [
            { id: 1, name: 'SpiderMan', strength: 50 },
            { id: 2, name: 'SuperMan', strength: 808 },
            { id: 3, name: 'BatMan', strength: 30 },
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        herosComponent = new HeroesComponent(mockHeroService);
    })

    it('should delete hero when delete() is called', () => {
        // Given
        herosComponent.heroes = mockHeroes;
        mockHeroService.deleteHero.and.returnValue(of()); // call the subscribe function (return nothing with of())

        // When
        herosComponent.delete(mockHeroes[1]);

        // Then
        expect(herosComponent.heroes.length).toBe(2);
        expect(herosComponent.heroes).toEqual([mockHeroes[0], mockHeroes[2]]);
        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(mockHeroes[1]);
    });
});