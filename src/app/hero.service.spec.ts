import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { MessageService } from "./message.service";
import { HeroService } from "./hero.service";

describe('HeroService Integration test', () => {

    let mockMessageService: jasmine.SpyObj<MessageService>;
    let httpTestingController: HttpTestingController;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        // Inject HttpTestingController
        httpTestingController = TestBed.inject(HttpTestingController);

        // Inject HeroService
        heroService = TestBed.inject(HeroService);
    });

    it('should return Hero when getHero() is called', () => {
        // Given
        const heroId = 3;
        heroService.getHero(heroId).subscribe();

        const url = 'api/heroes';
        const request = httpTestingController.expectOne(url + '/' + 3); // Get expected URL

        // When
        request.flush({ id: 3, name: 'BatMan', strength: 30 }); // Get expected result heroService.getHero(heroId).subscribe();

        // Then
        httpTestingController.verify();
    });
})