package pe.edu.upc.demo3798api.dtos;

import java.time.LocalDate;

public class ServerDTO {
    private int idServer;
    private String nameServer;
    private String ipServer;
    private String ubicationServer;
    private String soServer;
    private LocalDate startDateOperationServer;
    private String providerServer;

    public int getIdServer() {
        return idServer;
    }

    public void setIdServer(int idServer) {
        this.idServer = idServer;
    }

    public String getNameServer() {
        return nameServer;
    }

    public void setNameServer(String nameServer) {
        this.nameServer = nameServer;
    }

    public String getIpServer() {
        return ipServer;
    }

    public void setIpServer(String ipServer) {
        this.ipServer = ipServer;
    }

    public String getUbicationServer() {
        return ubicationServer;
    }

    public void setUbicationServer(String ubicationServer) {
        this.ubicationServer = ubicationServer;
    }

    public String getSoServer() {
        return soServer;
    }

    public void setSoServer(String soServer) {
        this.soServer = soServer;
    }

    public LocalDate getStartDateOperationServer() {
        return startDateOperationServer;
    }

    public void setStartDateOperationServer(LocalDate startDateOperationServer) {
        this.startDateOperationServer = startDateOperationServer;
    }

    public String getProviderServer() {
        return providerServer;
    }

    public void setProviderServer(String providerServer) {
        this.providerServer = providerServer;
    }
}
