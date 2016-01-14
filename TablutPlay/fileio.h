#include <QObject>
#include <QJsonDocument>

#ifndef FILEIO_H
#define FILEIO_H


class FileIO : public QObject
{

    Q_OBJECT


private:
    QString path = getDefaultPath();
    QJsonDocument defaultObject = getDefaultDocument();


public:
    FileIO();
    Q_INVOKABLE void setColor(QString, QString);
    Q_INVOKABLE QString readFile(QString);
    Q_INVOKABLE QString getColor(QString);
    Q_INVOKABLE void setDefaultColor();
    Q_INVOKABLE void setPath(QString);
    Q_INVOKABLE QString getPath();
    Q_INVOKABLE void setDefaultPath(QString);
    Q_INVOKABLE QString getDefaultPath();
    Q_INVOKABLE bool createNewConfigFile(QString);
    QJsonDocument getDefaultDocument();
    ~FileIO();

};

#endif // FILEIO_H
