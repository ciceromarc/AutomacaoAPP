import * as PUTBooks from '../../integration/services/Books/requests/PUTBooks.request';
import * as GETBooks from '../../integration/services/Books/requests/GETBooks.request';
import * as POSTBooks from '../../integration/services/Books/requests/POSTBooks.request';

describe('PUT Books', () => {
    it('Alterar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            PUTBooks.changeBook(resAllBooks.body[0].id).should((resChangeBook) => {
                expect(resChangeBook.status).to.eq(405);
                expect(resChangeBook.body).to.be.not.null;
                expect(resChangeBook.body.title).to.eq("Harry Potter e o Cálice de Fogo");
            });
        })
    });

    it('Criar e alterar um livro', () => {
        POSTBooks.addBook().then((resAllBook) => {
            PUTBooks.changeBook(resAllBook.body.id).should((resChangeBook) => {
                expect(resChangeBook.status).to.eq(405);
                expect(resChangeBook.body).to.be.not.null;
                expect(resChangeBook.body.title).to.eq("Harry Potter e o Cálice de Fogo");
            })
        })
    });
});