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

    int REMOVE_SUCCESSFULL = 0;
    int REMOVE_ERROR = 1;
    int REMOVE_ERROR_DEFAULT_FILE = 2;

public:
    FileIO();
    Q_INVOKABLE int removeFile(QString);
    Q_INVOKABLE void setColor(QString, QString);
    Q_INVOKABLE QString readFile(QString);
    Q_INVOKABLE QString getColor(QString);
    Q_INVOKABLE void setDefaultColor();
    Q_INVOKABLE void setPath(QString);
    Q_INVOKABLE QString getPath();
    Q_INVOKABLE void setDefaultPath(QString);
    Q_INVOKABLE QString getDefaultPath();
    Q_INVOKABLE bool createNewConfigFile(QString);
    Q_INVOKABLE int getRemoveErrorDefaultFile();
    Q_INVOKABLE int getRemoveError();
    Q_INVOKABLE int getRemoveSuccess();
    QJsonDocument getDefaultDocument();
    ~FileIO();

};

#endif // FILEIO_H
