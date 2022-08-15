import { MessageService } from "./message.service";

describe('MessageService Test', () => {

    it('should add a message when add() is called', () => {
        // Given
        const messageService = new MessageService();

        // When
        messageService.add('Message 1');
        messageService.add('Message 2');
        
        // Then
        expect(messageService.messages.length).toBe(2);
    });
    
    it('should clear all messages when clear() is called', () => {
        // Given
        const messageService = new MessageService();
        messageService.add('Message 1');
        messageService.add('Message 2');

        // When
        messageService.clear();

        // Then
        expect(messageService.messages.length).toBe(0);
    });
});