package pe.edu.upc.demo3798api.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.demo3798api.entities.App;
import pe.edu.upc.demo3798api.repositories.IAppRepository;
import pe.edu.upc.demo3798api.servicesinterfaces.IAppService;

import java.util.List;

@Service
public class AppServiceImplement implements IAppService {
    @Autowired
    private IAppRepository aR;

    @Override
    public List<App> list() {
        return aR.findAll();
    }

    @Override
    public void insertar(App a) {
        aR.save(a);
    }

    @Override
    public App listId(int id) {
        return aR.findById(id).orElse(new App());
    }

    @Override
    public void update(App a) {
        aR.save(a);
    }

    @Override
    public void delete(int id) {
        aR.deleteById(id);
    }

    @Override
    public List<String[]> quantityAppByServer() {
        return aR.quantityAppByServer();
    }

}
