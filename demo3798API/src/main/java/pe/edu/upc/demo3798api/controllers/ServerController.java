package pe.edu.upc.demo3798api.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.upc.demo3798api.dtos.MontoDTO;
import pe.edu.upc.demo3798api.dtos.ServerDTO;
import pe.edu.upc.demo3798api.entities.Server;
import pe.edu.upc.demo3798api.servicesinterfaces.IServerService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/servidores")
public class ServerController {
    @Autowired
    private IServerService sS;

    @GetMapping
    public List<ServerDTO> listar(){

        return sS.list().stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x, ServerDTO.class);
        }).collect(Collectors.toList());
    }
    @PostMapping
    public void insertar(@RequestBody ServerDTO dto){
        ModelMapper m = new ModelMapper();
        Server se = m.map(dto, Server.class);
        sS.insert(se);
    }
    @GetMapping("/{id}")
    public ServerDTO buscarId(@PathVariable("id") int id){
        ModelMapper m = new ModelMapper();
        ServerDTO dto=m.map(sS.listId(id), ServerDTO.class);
        return dto;
    }

    @PutMapping
    public void modificar(@RequestBody ServerDTO dto){
        ModelMapper m = new ModelMapper();
        Server se = m.map(dto, Server.class);
        sS.update(se);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") int id){
        sS.delete(id);
    }

    @GetMapping("/busquedas")
    public List<ServerDTO> buscarPorProveedor(@RequestParam String proveedor){
        return sS.buscar(proveedor).stream().map(z->{
            ModelMapper m = new ModelMapper();
            return m.map(z, ServerDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/montos")
    public List<MontoDTO> consulta02() {
        List<String[]> filaLista = sS.amountTotalByServer();
        List<MontoDTO> dtoLista = new ArrayList<>();

        for (String[] columna : filaLista) {
            MontoDTO dto = new MontoDTO();
            dto.setNameServer(columna[0]);
            dto.setAmountTotal(Double.parseDouble(columna[1]));
            dtoLista.add(dto);
        }

        return dtoLista;

    }


}
