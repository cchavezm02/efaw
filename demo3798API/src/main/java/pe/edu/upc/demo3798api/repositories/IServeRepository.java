package pe.edu.upc.demo3798api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.edu.upc.demo3798api.entities.Server;

import java.util.List;


@Repository
public interface IServeRepository extends JpaRepository<Server, Integer> {

    @Query("Select s from Server s where s.providerServer like %:nProveedor%")
    public List<Server> buscarProveedor(@Param("nProveedor") String nProveedor);


    @Query(value = " select s.name_server as Servidor,SUM(a.amount_app) as Monto_Aplicaciones \n" +
            " from Server s inner join App a\n" +
            " on s.id_server=a.id_server\n" +
            " group by s.name_server", nativeQuery = true)
    List<String[]> amountTotalByServer();
}
