package pe.edu.upc.demo3798api.entities;



import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "Server")
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idServer;
    @Column(name = "nameServer", nullable = false, length = 45)
    private String nameServer;
    @Column(name = "ipServer", nullable = false, length =20)
    private String ipServer;
    @Column(name = "ubicationServer", nullable = false, length =30)
    private String ubicationServer;
    @Column(name = "soServer", nullable = false, length =25)
    private String soServer;
    @Column(name = "startDateOperationServer", nullable = false)
    private LocalDate startDateOperationServer;
    @Column(name = "providerServer", nullable = false, length =28)
    private String providerServer;

    public Server() {
    }

    public Server(int idServer, String nameServer, String ipServer, String ubicationServer, String soServer, LocalDate startDateOperationServer, String providerServer) {
        this.idServer = idServer;
        this.nameServer = nameServer;
        this.ipServer = ipServer;
        this.ubicationServer = ubicationServer;
        this.soServer = soServer;
        this.startDateOperationServer = startDateOperationServer;
        this.providerServer = providerServer;
    }

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
