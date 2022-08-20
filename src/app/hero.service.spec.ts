import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { MessageService } from "./message.service";
import { HeroService } from "./hero.service";
import { Hero } from "./hero";

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
        const expectedHero: Hero = { id: 3, name: 'BatMan', strength: 30 };
        const url = 'api/heroes';

        // When
        // Make an HTTP GET request
        heroService.getHero(heroId).subscribe();

        // Then
        // The following `expectOne()` will match the request's URL.
        const request = httpTestingController.expectOne(url + '/' + 3); // Get expected URL

        // Asserts that correct data was returned from heroService.getHero(heroId).subscribe();
        request.flush(expectedHero);

        // Assert that the request is a GET.
        expect(request.request.method).toEqual('GET');

        // Finally, assert that there are no outstanding requests.      
        httpTestingController.verify();
    });
})