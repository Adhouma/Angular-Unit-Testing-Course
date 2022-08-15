import { ComponentFixture, TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";

import { HeroComponent } from "./hero.component"

describe('HeroComponent Integration Test', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        // Configure a Testing module for our HeroComponent 
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            imports: [RouterTestingModule] // We need RouterTestingModule because our template use routerLink
        });

        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct Hero', () => {
        // Given
        fixture.componentInstance.hero = { id: 1, name: 'SpiderMan', strength: 50 };

        // Then
        // Use fixture.componentInstance to interact with the component (.ts)
        expect(fixture.componentInstance.hero.name).toEqual('SpiderMan');
    });

    it('should render the Hero name in an anchor tag', () => {
        // Given
        fixture.componentInstance.hero = { id: 1, name: 'SpiderMan', strength: 50 };
        
        // When
        fixture.detectChanges();

        // Then
        // Use fixture.nativeElement to interact with the DOM element (.html) 
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SpiderMan');
    });

})