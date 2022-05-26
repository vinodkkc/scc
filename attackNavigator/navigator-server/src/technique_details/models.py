# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from datetime import datetime, timezone
import pytz
from django.db.models import UniqueConstraint


tz_IND = pytz.timezone('Asia/Kolkata')


class Tactic(models.Model):
    tactic_id = models.CharField(primary_key=True, max_length=20)
    tactic_name = models.CharField(max_length=25)

    def __str__(self):
        return self.tactic_name

    class Meta:
        managed = False
        db_table = 'tactic'


class Technique(models.Model):
    technique_id = models.CharField(max_length=20)
    technique_name = models.CharField(max_length=100)
    sub_technique_id = models.CharField(max_length=20, blank=True, null=True)
    sub_technique_name = models.CharField(max_length=100, blank=True, null=True)
    combine_tech_id = models.CharField(primary_key=True, max_length=20)
    # tactic = models.ForeignKey(Tactic, models.DO_NOTHING)
    tactic_id = models.CharField(max_length=50)
    color = models.CharField(max_length=10, blank=True, null=True)
    data_source = models.CharField(max_length=900, blank=True, null=True)
    os_type = models.TextField(blank=True, null=True)
    mitre_version = models.TextField(blank=True, null=True)
    attack_obj = models.ManyToManyField('Attacks', through='TechniqueAttack')
    # detection_obj = models.ManyToManyField('Detection', through='TechniqueDetection')
    mitigation_obj = models.ManyToManyField('Mitigation', through='TechniqueMitigation')

    def __str__(self):
        return self.combine_tech_id

    class Meta:
        managed = False
        db_table = 'technique'


class Attacks(models.Model):
    attack_id = models.AutoField(primary_key=True)
    # pre_requisite = models.TextField(blank=True, null=True)
    # file_name = models.CharField(max_length=50, blank=True, null=True)
    # script_type = models.CharField(max_length=20, blank=True, null=True)
    script = models.TextField(blank=True, null=True)
    support = models.CharField(max_length=20, blank=True, null=True)
    comment = models.CharField(max_length=2000, blank=True, null=True)
    color = models.CharField(max_length=10, blank=True, null=True)
    # modify_date = models.DateTimeField(default=datetime.now(tz_IND), blank=True)
    modify_date = models.DateTimeField(blank=True, auto_now=True)
    sub_technique_id = models.TextField(blank=True, null=False)
    # technique_ids = models.ManyToManyField(Technique, through='TechniqueAttack')

    def __str__(self):
        return self.attack_id

    class Meta:
        managed = False
        db_table = 'attacks'
        ordering = ('modify_date',)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Detection(models.Model):
    objects = None
    detection_id = models.AutoField(primary_key=True)
    script = models.TextField(blank=True, null=True)
    # script = models.JSONField(null=True)
    support = models.CharField(max_length=20, blank=True, null=True)
    script_type = models.CharField(max_length=20, blank=True, null=True)
    comment = models.CharField(max_length=2000, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    data_source = models.CharField(max_length=900, blank=True, null=True)
    attributes = models.TextField(blank=True, null=True)
    sub_technique_id = models.TextField(blank=True, null=False)
    modify_date = models.DateTimeField(blank=True, auto_now=True)
    # technique_ids = models.ManyToManyField(Technique, through='TechniqueDetection')

    def __str__(self):
        return self.detection_id

    class Meta:
        managed = False
        db_table = 'detection'
        ordering = ('modify_date',)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Mitigation(models.Model):
    mitigate_id = models.CharField(primary_key=True, max_length=20)
    mitigate_name = models.CharField(max_length=100)
    description = models.CharField(max_length=5000, blank=True, null=True)
    support = models.CharField(max_length=50, blank=True, null=True)
    brief_info = models.CharField(max_length=3000, blank=True, null=True)
    color = models.CharField(max_length=10, blank=True, null=True)
    technique_ids = models.ManyToManyField(Technique, through='TechniqueMitigation')

    def __str__(self):
        return self.mitigate_name

    class Meta:
        managed = False
        db_table = 'mitigation'


class OldTechniques(models.Model):
    technique_id = models.CharField(primary_key=True, max_length=20)
    technique_name = models.CharField(max_length=100)
    sub_technique_id = models.CharField(unique=True, max_length=20)
    sub_technique_name = models.CharField(max_length=100, blank=True, null=True)
    tactic = models.ForeignKey('Tactic', models.DO_NOTHING)
    color = models.CharField(max_length=10, blank=True, null=True)
    support = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'old_techniques'
        unique_together = (('technique_id', 'sub_technique_id'),)


class TechniqueAttack(models.Model):
    id = models.AutoField(primary_key=True)
    # combine_tech = models.OneToOneField(Technique, models.DO_NOTHING)
    combine_tech = models.ForeignKey(Technique, on_delete=models.CASCADE)
    attack = models.ForeignKey(Attacks, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'technique_attack'
        unique_together = (('combine_tech', 'attack'),)


# class TechniqueDetection(models.Model):
#     id = models.AutoField(primary_key=True)
#     # combine_tech = models.OneToOneField(Technique, models.DO_NOTHING, unique=False)
#     combine_tech = models.ForeignKey(Technique, on_delete=models.CASCADE)
#     detection = models.ForeignKey(Detection, on_delete=models.CASCADE)
#
#     class Meta:
#         managed = False
#         db_table = 'technique_detection'
#         unique_together = (('combine_tech', 'detection'),)


class TechniqueMitigation(models.Model):
    id = models.AutoField(primary_key=True)
    # combine_tech = models.OneToOneField(Technique, models.DO_NOTHING, primary_key=True)
    combine_tech = models.ForeignKey(Technique, on_delete=models.CASCADE)
    mitigate = models.ForeignKey(Mitigation, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'technique_mitigation'
        unique_together = (('combine_tech', 'mitigate'),)
