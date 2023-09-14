# TAREA 1

Cree una BDD, y ejecute las siguientes instrucciones, por cada instrucción realizada tome captura de la respuesta de su asistente (workbench, datagrip, dbeaver, etc) y subir en un solo documento en formato pdf las capturas correspondientes:

## Instrucción 1

create table CAMIONES (

COD_CAMION INTEGER not null,

MARCA VARCHAR2(150),

MODELO VARCHAR2(300),

 ANNO NUMBER,

PESO_CARGA INTEGER,

 PATENTE VARCHAR2(300) ) ;

 

## Instrucción 2

alter table CAMIONES add constraint PK_CAMIONES primary key (COD_CAMION);

 

## Instrucción 3

drop table CAMIONES EJEMPLOS 2;

 

## Instrucción 4

create table CAMIONES (

COD_CAMION INTEGER not null,

MARCA VARCHAR2(150),

MODELO VARCHAR2(300),

ANNO NUMBER,

PESO_CARGA INTEGER,

PATENTE VARCHAR2(300) );

 

## Instrucción 5

alter table CAMIONES add constraint PK_CAMIONES primary key (COD_CAMION);

 

## Instrucción 6

insert into CAMIONES (COD_CAMION, MARCA, MODELO, ANNO, PESO_CARGA, PATENTE)

values (1000, 'susuki', 'baleno', 1995, 45, 'pi-1516');

 

## Instrucción 7

 

update camiones c set c.modelo='probando'

where c.cod_camion=1000;

 

## Instrucción 8

delete from camiones c where c.cod_camion=1000;
