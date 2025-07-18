package pe.edu.upc.demo3798api.servicesinterfaces;

import pe.edu.upc.demo3798api.entities.App;

import java.util.List;

public interface IAppService {
    public List<App> list();
    public void insertar(App app);
    public App listId(int id);
    public void update(App a);
    public void delete(int id);
    List<String[]> quantityAppByServer();
}
