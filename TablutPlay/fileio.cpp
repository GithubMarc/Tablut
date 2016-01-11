#include "fileio.h"
#include <QFile>
#include <QTextStream>
#include <QJsonObject>
#include <QJsonDocument>

FileIO::FileIO()
{

}

void FileIO::writeFile(QString path, QString text){
    QFile file(path);

    if(file.open(QIODevice::ReadWrite)){
    QTextStream stream(&file);
    stream << text << endl;
    }

    return;
}

QString FileIO::readFile(QString path){
    QFile file(path);
    QString txt = "";

    if(file.open(QIODevice::ReadWrite)){
    QTextStream stream(&file);
    txt = stream.readAll();
    }

    return txt;
}

QString FileIO::getBackgroundColor(QString path){
    QString txt = readFile(path);
    QJsonDocument jDoc = QJsonDocument::fromJson(txt.toUtf8());

    QJsonObject json = jDoc.object();

    //txt = json["option"].toString();
    return;
}

FileIO::~FileIO()
{

}


