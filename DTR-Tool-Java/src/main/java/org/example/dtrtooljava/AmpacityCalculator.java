package org.example.dtrtooljava;

public class AmpacityCalculator {
    //Formula from standard 738
    //I_ampacity^2 R(T)=hA(T−T_amb)+σϵA[T^4−T_amb^4]

    final double STEFAN_BOLTZMANN_CONSTANT = 5.76e-8;
    public double calculator(double ambientTemperature, double conductorTemperature,
                             double resistanceAtTemperature, double convectiveHeatTransferCoefficient,
                             double surfaceArea, double emissivity){
        
        double heatGeneration = Math.pow(resistanceAtTemperature, 2);
        double convectiveHeatLoss =  convectiveHeatTransferCoefficient * surfaceArea * (conductorTemperature - ambientTemperature);
        double radiativeHeatLoss = STEFAN_BOLTZMANN_CONSTANT * emissivity * surfaceArea * (Math.pow(conductorTemperature, 4) - Math.pow(ambientTemperature, 4));

        return Math.sqrt((convectiveHeatLoss + radiativeHeatLoss) / heatGeneration);
    }
}
