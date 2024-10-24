USE poli_eventos_db;

DELIMITER $$
CREATE PROCEDURE EliminarEsquemaCategorizacion(IN esquemaId BIGINT UNSIGNED)
BEGIN
    DELETE FROM Esquemas_Categorizacion WHERE id = esquemaId;
END $$
DELIMITER ;



select * from Esquemas_Categorizacion;
CALL EliminarEsquemaCategorizacion(5); 



DELIMITER $$
CREATE PROCEDURE EliminarCategoria(IN categoriaId BIGINT UNSIGNED)
BEGIN
    DELETE FROM Categorias WHERE id = categoriaId;
END $$
DELIMITER ;

select * from categorias;

