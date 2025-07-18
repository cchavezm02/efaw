package pe.edu.upc.demo3798api.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name = "App")
public class App {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idApp;

    @Column(name = "nameApp",length = 20,nullable = false)
    private String nameApp;

    @Column(name = "stateApp",nullable = false)
    private Boolean stateApp;

    @Column(name = "implementationDateApp",nullable = false)
    private LocalDate implementationDateApp;

    @Column(name = "amountApp",nullable = false)
    private double amountApp;

    @Column(name = "typeApp",length = 30,nullable = false)
    private String typeApp;

    @ManyToOne
    @JoinColumn(name = "idServer")
    private Server server;

    public App() {
    }

    public App(int idApp, String nameApp, Boolean stateApp, LocalDate implementationDateApp, double amountApp, String typeApp, Server server) {
        this.idApp = idApp;
        this.nameApp = nameApp;
        this.stateApp = stateApp;
        this.implementationDateApp = implementationDateApp;
        this.amountApp = amountApp;
        this.typeApp = typeApp;
        this.server = server;
    }

    public int getIdApp() {
        return idApp;
    }

    public void setIdApp(int idApp) {
        this.idApp = idApp;
    }

    public String getNameApp() {
        return nameApp;
    }

    public void setNameApp(String nameApp) {
        this.nameApp = nameApp;
    }

    public Boolean getStateApp() {
        return stateApp;
    }

    public void setStateApp(Boolean stateApp) {
        this.stateApp = stateApp;
    }

    public LocalDate getImplementationDateApp() {
        return implementationDateApp;
    }

    public void setImplementationDateApp(LocalDate implementationDateApp) {
        this.implementationDateApp = implementationDateApp;
    }

    public double getAmountApp() {
        return amountApp;
    }

    public void setAmountApp(double amountApp) {
        this.amountApp = amountApp;
    }

    public String getTypeApp() {
        return typeApp;
    }

    public void setTypeApp(String typeApp) {
        this.typeApp = typeApp;
    }

    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }
}
