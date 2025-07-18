package pe.edu.upc.demo3798api.servicesimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.upc.demo3798api.entities.Server;
import pe.edu.upc.demo3798api.repositories.IServeRepository;
import pe.edu.upc.demo3798api.servicesinterfaces.IServerService;

import java.util.List;
@Service
public class ServerServiceImplement implements IServerService {
    @Autowired
    private IServeRepository sR;

    @Override
    public List<Server> list() {
        return sR.findAll();
    }

    @Override
    public void insert(Server s) {
        sR.save(s);
    }

    @Override
    public Server listId(int id) {
        return sR.findById(id).orElse(new Server());
    }

    @Override
    public void update(Server s) {
        sR.save(s);
    }

    @Override
    public void delete(int id) {
        sR.deleteById(id);
    }

    @Override
    public List<Server> buscar(String nombre) {
        return sR.buscarProveedor(nombre);
    }

    @Override
    public List<String[]> amountTotalByServer() {
        return sR.amountTotalByServer();
    }
}
