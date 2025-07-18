package pe.edu.upc.demo3798api.servicesinterfaces;

import pe.edu.upc.demo3798api.entities.Server;

import java.util.List;

public interface IServerService {
    public List<Server> list();
    public void insert(Server s);
    public Server listId(int id);
    public void update(Server s);
    public void delete(int id);
    public List<Server> buscar(String nombre);
    List<String[]> amountTotalByServer();
}
