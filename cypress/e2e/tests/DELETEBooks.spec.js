import * as DELETEBooks from '../Books/requests/DELETEBooks.request';
import * as GETBooks from '../Books/requests/GETBooks.request';
import * as POSTBooks from '../Books/requests/POSTBooks.request';


describe('DELETE Books', () => {
    it('Deletar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            DELETEBooks.deleteBook(resAllBooks.body[0].id).should((resDeleteBook) => {
                expect(resDeleteBook.status).to.eq(405);
            })
        })
    });

    it('Criar e excluir um livro', () => {
        POSTBooks.addBook().then((resAddBook) => {
            DELETEBooks.deleteBook(resAddBook.body.id).should((resDeleteBook) => {
                expect(resDeleteBook.status).to.eq(405);
            })
        });
    })
});

