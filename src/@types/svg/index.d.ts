declare module "*.svg" {//* é o mesmo que todos os arquivos que terminam com a extensão que vem na frente no caso todos que terminam com svg
    import React from "react";
    import { SvgProps } from "react-native-svg"; //pego as propriedades do svg para tipar
    const content: React.FC<SvgProps>; //React.FC<SvgProps> = Funcional Component do tipo svg
    export default content;
}