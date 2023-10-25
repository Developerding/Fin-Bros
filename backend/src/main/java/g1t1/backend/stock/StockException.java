package g1t1.backend.stock;

public class StockException {

    public static class StockCannotImportException extends RuntimeException {
        public StockCannotImportException(String msg) {
            super(msg);
        }
    }

}
