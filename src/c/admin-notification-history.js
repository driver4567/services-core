window.c.AdminNotificationHistory = ((m, h, _, models) => {
    return {
        controller: (args) => {
            const notifications = m.prop([]),
                getNotifications = (user) => {
                    let notification = models.notification;
                    notification.getPageWithToken(m.postgrest.filtersVM({user_id: 'eq', sent_at: 'is.null'}).user_id(user.id).sent_at(!null).order({sent_at: 'desc'}).parameters()).then(function(data){
                        notifications(data);
                    });
                    return notifications();
                };

            getNotifications(args.user);

            return {
                notifications: notifications
            };
        },

        view: (ctrl) => {
            return m('.w-col.w-col-4', [
                m('.fontweight-semibold.fontsize-smaller.lineheight-tighter.u-marginbottom-20', 'Histórico de notificações'),
                ctrl.notifications().map(function(cEvent) {
                    return m('.w-row.fontsize-smallest.lineheight-looser.date-event', [
                        m('.w-col.w-col-24', [
                            m('.fontcolor-secondary', h.momentify(cEvent.sent_at, 'DD/MM/YYYY, HH:mm'),
                              ' - ', cEvent.template_name)
                        ]),
                    ]);
                })
            ]);
        }
    };
}(window.m, window.c.h, window._, window.c.models));
