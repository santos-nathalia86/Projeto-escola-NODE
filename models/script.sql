create database bd_escola;
use bd_escola;

create table responsavel (
id_responsavel  int not null auto_increment primary key,
nome_responsavel varchar (128) not null
);

create table turma(
id_turma int not null auto_increment primary key,
descricao varchar(50),
responsavel_fk int,
createdAt datetime,
updatedAt datetime,
foreign key (responsavel_fk) references responsavel(id_responsavel)
);

create table aluno(
id_aluno int not null auto_increment primary key,
matricula integer,
nome varchar(100),
fk_turma int,
createdAt datetime,
updatedAt datetime,
INDEX aluno_FKIndex1(fk_turma),
FOREIGN KEY(fk_turma)
REFERENCES turma(id_turma)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);

insert into responsavel values(default, "Ana Maria");
insert into responsavel values(default, "Mário Jesus");

insert into turma values(Default, "Recursos Humanos", 1, now(), now());
insert into turma values(Default, "Desenvolvimento de sistemas", 2, now(), now());

insert into aluno values(default, 04454,'Matheus', 2, now(), now());
insert into aluno values(default, 04455,'Guilherme', 1, now(), now());


create table usuario(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
username VARCHAR (30),
email VARCHAR (255),
senha VARCHAR (40), 
createdAt DATETIME, updatedAt DATETIME);

select * from turma;
select * from aluno;
select * from responsavel;


select a.id_aluno as ID, a.matricula as 'N° matrícula', a.nome as 'Nome do aluno', 
t.descricao as 'Curso' from aluno as a inner join turma as t on
a.fk_turma=t.id_turma;

create view selecAluno as select a.id_aluno as id_aluno, a.matricula as
matricula, a.nome as nome, t.descricao from aluno as a inner join turma 
as t on a.fk_turma=t.id_turma;

select * from selecAluno;

select t.id_turma as ID, t.descricao as Descrição, p.nome_responsavel as 'Professor responsável' from
turma as t inner join responsavel as p on t.responsavel_fk=p.id_responsavel;

create view selecTurma as select t.id_turma as Id_turma, t.descricao as Descrição, p.nome_responsavel from
turma as t inner join responsavel as p on t.responsavel_fk=p.id_responsavel;

select * from selecTurma